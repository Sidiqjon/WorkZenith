import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TelegramBotService {
  private bot: Telegraf;
  private admins: Map<number, string> = new Map(); // userId -> phoneNumber
  private adminGroupId: number;

  constructor(private prisma: PrismaService) {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
    this.adminGroupId = parseInt(process.env.ADMIN_GROUP_ID!);

    this.bot.start((ctx) => ctx.reply('Welcome! Use /login <phone_number> <password> to authenticate.'));
    this.bot.command('login', this.handleLogin.bind(this));
    this.bot.command('search_user', this.handleSearchUser.bind(this));
    this.bot.command('ban_user', this.handleBanUser.bind(this));
    this.bot.command('activate_user', this.handleActivateUser.bind(this));
    this.bot.command('view_pending_orders', this.handleViewPendingOrders.bind(this));
    this.bot.command('update_order_status', this.handleUpdateOrderStatus.bind(this));
    this.bot.launch();
  }

  private async handleLogin(ctx) {
    const [, phone, password] = ctx.message.text.split(' ');
    if (!phone || !password) return ctx.reply('Usage: /login <phone_number> <password>');

    const user = await this.prisma.user.findFirst({
      where: { phoneNumber: phone },
    });

    if (!user) {
      return ctx.reply('Admin not found.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return ctx.reply('Phone number or password is incorrect.');
    }

    this.admins.set(ctx.from.id, phone);
    ctx.reply(`Logged in successfully. Your ID: ${ctx.from.id}`);
  }

  private async handleSearchUser(ctx) {
    if (!this.isAdmin(ctx.from.id)) return ctx.reply('Unauthorized.');

    const query = ctx.message.text.split(' ').slice(1).join(' ');
    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { phoneNumber: query },
          { firstName: { contains: query } },
          { id: query },
        ],
      },
      include: { region: true },
    });

    if (!users.length) return ctx.reply('No users found.');

    const response = users.map(
      (u) => `ID: ${u.id}\nName: ${u.firstName} ${u.lastName}\nRole: ${u.role}\nStatus: ${u.status}\nRegion: ${u.region?.nameUz || 'N/A'}`
    ).join('\n\n');

    ctx.reply(response);
  }

  private async handleBanUser(ctx) {
    if (!this.isAdmin(ctx.from.id)) return ctx.reply('Unauthorized.');

    const [, userId] = ctx.message.text.split(' ');
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { status: 'BANNED' },
    });

    if (!user) return ctx.reply('User not found.');
    ctx.reply(`User ${user.firstName} ${user.lastName} has been banned.`);
  }

  private async handleActivateUser(ctx) {
    if (!this.isAdmin(ctx.from.id)) return ctx.reply('Unauthorized.');

    const [, userId] = ctx.message.text.split(' ');
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { status: 'ACTIVE' },
    });

    if (!user) return ctx.reply('User not found.');
    ctx.reply(`User ${user.firstName} ${user.lastName} has been activated.`);
  }

  private async handleViewPendingOrders(ctx) {
    if (!this.isAdmin(ctx.from.id)) return ctx.reply('Unauthorized.');

    const orders = await this.prisma.order.findMany({
      where: { status: { in: ['PENDING', 'ACCEPTED'] } },
      include: { owner: true },
    });

    if (!orders.length) return ctx.reply('No pending orders found.');

    const response = orders.map(
      (o) => `Order ID: ${o.id}\nOwner: ${o.owner.firstName} ${o.owner.lastName}\nTotal Price: ${o.totalPrice}\nPayment Type: ${o.paymentType}\nStatus: ${o.status}`
    ).join('\n\n');

    ctx.reply(response);
  }

  private async handleUpdateOrderStatus(ctx) {
    if (!this.isAdmin(ctx.from.id)) return ctx.reply('Unauthorized.');

    const [, orderId, status] = ctx.message.text.split(' ');
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    if (!order) return ctx.reply('Order not found.');
    ctx.reply(`Order ${order.id} status updated to ${status}.`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async sendDailyReport() {
    const totalOrders = await this.prisma.order.count();
    const revenue = await this.prisma.order.aggregate({
      _sum: { totalPrice: true },
    });
    const activeUsers = await this.prisma.user.count({ where: { status: 'ACTIVE' } });

    const report = `Daily Report:\nTotal Orders: ${totalOrders}\nRevenue: ${revenue._sum.totalPrice || 0}\nActive Users: ${activeUsers}`;
    this.bot.telegram.sendMessage(this.adminGroupId, report);
  }

  private isAdmin(userId: number): boolean {
    return this.admins.has(userId);
  }

  public async notifyNewOrder(order: any, orderProducts: any[]) {
    const owner = await this.prisma.user.findUnique({
      where: { id: order.ownerId },
    });

    const productDetails = orderProducts
      .map(
        (op) =>
          `- Product: ${op.professionId ? 'Profession' : 'Tool'}, ID: ${
            op.professionId || op.toolId
          }, Quantity: ${op.quantity}, Time Unit: ${op.timeUnit}, Working Time: ${op.workingTime}`
      )
      .join('\n');

    const message = `
🔔 New Order Created:
Order ID: ${order.id}
Owner: ${owner!.firstName} ${owner!.lastName} (${owner!.phoneNumber})
Address: ${order.address}
Total Price: ${order.totalPrice}
Payment Type: ${order.paymentType}
Status: ${order.status}

Order Products:
${productDetails}
    `;

    this.bot.telegram.sendMessage(this.adminGroupId, message);
  }

}