# 📋 Task Manager Backend - Tổng Quan Dự Án

## 🎯 Mô Tả Dự Án

Task Manager Backend là một RESTful API được xây dựng bằng Node.js và Express.js, cung cấp các chức năng quản lý công việc (tasks) và người dùng (users). Dự án sử dụng MongoDB làm cơ sở dữ liệu và JWT để xác thực người dùng.

## 🏗️ Kiến Trúc Dự Án

```
backend/
├── src/
│   ├── app.js                 # Entry point của ứng dụng
│   ├── config/               # Cấu hình database và môi trường
│   │   ├── config.js         # Cấu hình chung
│   │   └── mongoose.js       # Kết nối MongoDB
│   ├── controllers/          # Logic xử lý business
│   │   ├── task.controller.js # Controller cho tasks
│   │   └── user.controller.js # Controller cho users
│   ├── middleware/           # Middleware xử lý
│   │   └── auth.middleware.js # Xác thực JWT
│   ├── models/              # Schema và models
│   │   ├── tasks.js         # Model cho tasks
│   │   └── users.js         # Model cho users
│   └── routes/              # Định nghĩa API endpoints
│       ├── task.route.js    # Routes cho tasks
│       └── user.route.js    # Routes cho users
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── package.json            # Dependencies và scripts
├── WORKFLOW.md             # Quy trình làm việc chi tiết
└── PROJECT_OVERVIEW.md     # File tài liệu này
```

## 🛠️ Công Nghệ Sử Dụng

### Core Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM cho MongoDB

### Authentication & Security
- **JWT (jsonwebtoken)**: Token-based authentication
- **bcrypt/bcryptjs**: Mã hóa mật khẩu
- **validator**: Validation dữ liệu

### Documentation
- **Swagger UI Express**: API documentation interface
- **swagger-jsdoc**: JSDoc to Swagger conversion

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## 📊 Cấu Trúc Database

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required, validated),
  password: String (hashed, required),
  createdAt: Date,
  updatedAt: Date
}
``` USER

### Tasks Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 API Endpoints

### User Authentication
```
POST /users/register    # Đăng ký người dùng mới
POST /users/login       # Đăng nhập
```

### Task Management (Yêu cầu Authentication)
```
GET    /tasks          # Lấy danh sách tasks của user
POST   /tasks          # Tạo task mới
GET    /tasks/:id      # Lấy chi tiết một task
PUT    /tasks/:id      # Cập nhật task
DELETE /tasks/:id      # Xóa task
```

## 🔐 Authentication Flow

1. **Đăng ký**: User tạo tài khoản với username, email, password
2. **Đăng nhập**: User login và nhận JWT token
3. **Authorization**: Mỗi request đến protected routes cần header:
   ```
   Authorization: Bearer <jwt_token>
   ```
4. **Middleware**: `auth.middleware.js` verify token và gắn user info vào request

## 🚀 Cách Chạy Dự Án

### Sử dụng Docker (Khuyến nghị)
```bash
# Khởi chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f web

# Dừng services
docker-compose down
```

### Chạy Local
```bash
# Cài đặt dependencies
npm install

# Khởi chạy MongoDB (cần cài đặt trước)
# Cấu hình .env file

# Chạy server
node src/app.js
```

## 📝 Environment Variables

Tạo file `.env` với các biến sau:
```env
MONGO_URI=mongodb://anlangthang:123456@localhost:27017/task-manager?authSource=admin
JWT_SECRET=your_jwt_secret_key_here
PORT=3001
```

## 🔧 Middleware và Validation

### Auth Middleware
- Kiểm tra JWT token trong header
- Verify token và extract user info
- Gắn user info vào request object

### Request Validation
- Validate empty JSON body
- Validate email format (sử dụng validator library)
- Validate required fields

## 📚 API Documentation

Dự án đã tích hợp Swagger để tự động tạo tài liệu API:
- **Endpoint**: `/api-docs`
- **Công cụ**: swagger-ui-express + swagger-jsdoc
- **Format**: JSDoc comments trong code

## 🐳 Docker Configuration

### Dockerfile
- Base image: Node.js
- Expose port 3001
- Copy source code và install dependencies

### Docker Compose
- **web service**: Node.js application
- **mongo service**: MongoDB database
- **Network**: Internal communication
- **Volumes**: Persistent data storage

## 📁 Chi Tiết Các Thành Phần

### Controllers
- **task.controller.js**: CRUD operations cho tasks
- **user.controller.js**: Authentication logic (register, login)

### Models
- **tasks.js**: Mongoose schema cho tasks với validation
- **users.js**: Mongoose schema cho users với password hashing

### Routes
- **task.route.js**: Define API endpoints cho task operations
- **user.route.js**: Define API endpoints cho user authentication

### Config
- **mongoose.js**: Database connection setup
- **config.js**: General configuration settings

## 🔄 Workflow Phát Triển

1. **Setup**: Clone repo, install dependencies
2. **Development**: Modify code, test locally
3. **Testing**: Use Postman/curl để test API
4. **Documentation**: Update Swagger comments
5. **Deployment**: Build Docker image, deploy

## 🚦 Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found
- **500**: Internal Server Error

## 📋 TODO / Cải Tiến

- [ ] Implement pagination cho GET /tasks
- [ ] Add task categories/tags
- [ ] Implement task sharing between users
- [ ] Add email notifications
- [ ] Implement rate limiting
- [ ] Add comprehensive error logging
- [ ] Write unit tests
- [ ] Add API versioning

## 🤝 Đóng Góp

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

*Tài liệu này được tạo để cung cấp cái nhìn tổng quan về dự án Task Manager Backend. Để biết thêm chi tiết về quy trình làm việc, vui lòng tham khảo file `WORKFLOW.md`.*
