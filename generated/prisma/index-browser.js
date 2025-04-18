
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  password: 'password',
  regionId: 'regionId',
  status: 'status',
  role: 'role',
  refreshToken: 'refreshToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  taxId: 'taxId',
  bankCode: 'bankCode',
  bankAccount: 'bankAccount',
  bankName: 'bankName',
  oked: 'oked',
  address: 'address',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  ip: 'ip',
  userAgent: 'userAgent',
  device: 'device',
  brand: 'brand',
  model: 'model',
  os: 'os',
  osVersion: 'osVersion',
  client: 'client',
  clientType: 'clientType',
  clientVersion: 'clientVersion',
  isBot: 'isBot',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PowerScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ToolScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  descriptionUz: 'descriptionUz',
  descriptionRu: 'descriptionRu',
  descriptionEn: 'descriptionEn',
  price: 'price',
  quantity: 'quantity',
  code: 'code',
  brandId: 'brandId',
  powerId: 'powerId',
  sizeId: 'sizeId',
  img: 'img',
  isAvailable: 'isAvailable',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  isActive: 'isActive',
  birthYear: 'birthYear',
  img: 'img',
  passportImg: 'passportImg',
  about: 'about',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterProfessionScalarFieldEnum = {
  id: 'id',
  professionId: 'professionId',
  minWorkingHours: 'minWorkingHours',
  levelId: 'levelId',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  experience: 'experience',
  masterId: 'masterId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfessionScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  img: 'img',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfessionLevelScalarFieldEnum = {
  id: 'id',
  professionId: 'professionId',
  levelId: 'levelId',
  minWorkingHours: 'minWorkingHours',
  priceHourly: 'priceHourly',
  priceDaily: 'priceDaily',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfessionToolScalarFieldEnum = {
  id: 'id',
  professionId: 'professionId',
  toolId: 'toolId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  address: 'address',
  latitude: 'latitude',
  longitude: 'longitude',
  date: 'date',
  totalPrice: 'totalPrice',
  isPaid: 'isPaid',
  paymentType: 'paymentType',
  withDelivery: 'withDelivery',
  status: 'status',
  deliveryComment: 'deliveryComment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderProductScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  professionId: 'professionId',
  toolId: 'toolId',
  levelId: 'levelId',
  quantity: 'quantity',
  timeUnit: 'timeUnit',
  workingTime: 'workingTime',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderMasterScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  masterid: 'masterid'
};

exports.Prisma.BasketScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  professionId: 'professionId',
  toolId: 'toolId',
  levelId: 'levelId',
  quantity: 'quantity',
  timeUnit: 'timeUnit',
  workingTime: 'workingTime',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  message: 'message',
  userId: 'userId',
  orderId: 'orderId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterRatingsScalarFieldEnum = {
  id: 'id',
  star: 'star',
  masterId: 'masterId',
  commentId: 'commentId'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  address: 'address',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  questionUz: 'questionUz',
  questionRu: 'questionRu',
  questionEn: 'questionEn',
  answerUz: 'answerUz',
  answerRu: 'answerRu',
  answerEn: 'answerEn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShowcaseScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  descriptionUz: 'descriptionUz',
  descriptionRu: 'descriptionRu',
  descriptionEn: 'descriptionEn',
  image: 'image',
  link: 'link',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  nameUz: 'nameUz',
  nameRu: 'nameRu',
  nameEn: 'nameEn',
  image: 'image',
  link: 'link',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SiteMetadataScalarFieldEnum = {
  id: 'id',
  aboutUz: 'aboutUz',
  aboutRu: 'aboutRu',
  aboutEn: 'aboutEn',
  privacyPolicyUz: 'privacyPolicyUz',
  privacyPolicyRu: 'privacyPolicyRu',
  privacyPolicyEn: 'privacyPolicyEn',
  email: 'email',
  phoneNumber: 'phoneNumber',
  socialMedia: 'socialMedia',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BANNED: 'BANNED'
};

exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  SUPERADMIN: 'SUPERADMIN',
  VIEWERADMIN: 'VIEWERADMIN',
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY'
};

exports.PaymentType = exports.$Enums.PaymentType = {
  CASH: 'CASH',
  CLICK: 'CLICK',
  PAYME: 'PAYME'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
};

exports.TimeUnit = exports.$Enums.TimeUnit = {
  HOURLY: 'HOURLY',
  DAILY: 'DAILY'
};

exports.Prisma.ModelName = {
  Region: 'Region',
  User: 'User',
  Company: 'Company',
  Session: 'Session',
  Brand: 'Brand',
  Size: 'Size',
  Power: 'Power',
  Tool: 'Tool',
  Master: 'Master',
  MasterProfession: 'MasterProfession',
  Level: 'Level',
  Profession: 'Profession',
  ProfessionLevel: 'ProfessionLevel',
  ProfessionTool: 'ProfessionTool',
  Order: 'Order',
  OrderProduct: 'OrderProduct',
  OrderMaster: 'OrderMaster',
  Basket: 'Basket',
  Comment: 'Comment',
  MasterRatings: 'MasterRatings',
  Contact: 'Contact',
  FAQ: 'FAQ',
  Showcase: 'Showcase',
  Partner: 'Partner',
  SiteMetadata: 'SiteMetadata'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
