# 📋 Task Manager Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-20.x-blue.svg)](https://www.docker.com/)

> RESTful API cho ứng dụng quản lý công việc được xây dựng với Node.js, Express.js và MongoDB

## 🎯 Mục Lục

- [Tổng Quan](#-tổng-quan)
- [Tính Năng](#-tính-năng)
- [Công Nghệ](#-công-nghệ)
- [Cài Đặt](#-cài-đặt)
- [Sử Dụng](#-sử-dụng)
- [API Documentation](#-api-documentation)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Deployment](#-deployment)
- [Đóng Góp](#-đóng-góp)

## 🚀 Tổng Quan

Task Manager Backend là một RESTful API cung cấp các chức năng quản lý công việc và người dùng. API được xây dựng với kiến trúc MVC, sử dụng JWT cho authentication và MongoDB làm cơ sở dữ liệu.

### ✨ Tính Năng Chính

- 🔐 **Authentication System**: Đăng ký, đăng nhập với JWT
- 📝 **Task Management**: CRUD operations cho công việc
- 🔍 **Advanced Search**: Tìm kiếm theo title, description, labels
- 📊 **Filtering & Sorting**: Lọc theo status, sắp xếp theo deadline
- 📄 **Pagination**: Phân trang cho danh sách tasks
- 🏷️ **Labels System**: Gắn nhãn cho tasks
- 📅 **Deadline Management**: Quản lý thời hạn công việc
- 🐳 **Docker Support**: Containerization với Docker Compose

## 🛠️ Công Nghệ

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM cho MongoDB

### Authentication & Security
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **validator** - Input validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📦 Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js (v14+)
- MongoDB (v4.4+)
- Docker & Docker Compose (tùy chọn)

### Cách 1: Sử Dụng Docker (Khuyến Nghị)

```bash
# Clone repository
git clone <repository-url>
cd Task_Manager/backend

# Khởi chạy với Docker Compose
docker-compose up -d

# Kiểm tra logs
docker-compose logs -f web
```

### Cách 2: Cài Đặt Local

```bash
# Clone repository
git clone <repository-url>
cd Task_Manager/backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
```

Cấu hình file `.env`:
```env
MONGO_URI=mongodb://anlangthang:123456@localhost:27017/task-manager?authSource=admin
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3001
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
COOKIE_MAX_AGE=3600000
```

```bash
# Khởi chạy MongoDB (nếu chưa có)
mongod

# Chạy server
npm start
# hoặc
node src/app.js

``` SRC
## 🚀 Sử Dụng

### Khởi Chạy Server

```bash
# Development mode
npm run dev

# Production mode
npm start

# Docker mode
docker-compose up -d
```

### Kiểm Tra Server

```bash
# Health check
curl http://localhost:3001/health

# Server sẽ chạy tại: http://localhost:3001
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### Đăng Ký Người Dùng
```http
POST /users/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "0123456789",
  "address": "123 Main St, City"
}
```

#### Đăng Nhập
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Đăng Xuất
```http
POST /users/logout
```

### Task Endpoints (Yêu Cầu Authentication)

#### Tạo Task Mới
```http
POST /tasks/create
Content-Type: application/json
Cookie: accessToken=<jwt_token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the API",
  "deadline": "2024-01-15T10:00:00.000Z",
  "status": "todo",
  "labels": ["documentation", "important"]
}
```

#### Lấy Danh Sách Tasks
```http
GET /tasks/get?page=1&limit=10&status=todo&sort=deadline&search=project
Cookie: accessToken=<jwt_token>
```

**Query Parameters:**
- `page`: Số trang (default: 1)
- `limit`: Số items per page (default: 10)
- `status`: Lọc theo status (todo, in-progress, done, cancelled)
- `sort`: Sắp xếp (deadline)
- `search`: Tìm kiếm trong title, description, labels

#### Lấy Task Theo ID
```http
GET /tasks/get/:id
Cookie: accessToken=<jwt_token>
```

#### Cập Nhật Task
```http
PUT /tasks/update/:id
Content-Type: application/json
Cookie: accessToken=<jwt_token>

{
  "title": "Updated task title",
  "description": "Updated description",
  "deadline": "2024-01-20T10:00:00.000Z",
  "status": "in-progress",
  "labels": ["updated", "urgent"]
}
```

#### Xóa Task
```http
DELETE /tasks/delete/:id
Cookie: accessToken=<jwt_token>
```

#### Cập Nhật Status
```http
PATCH /tasks/updateStatus/:id
Content-Type: application/json
Cookie: accessToken=<jwt_token>

{
  "status": "done"
}
```

#### Lọc Theo Status
```http
GET /tasks/filter?status=done
Cookie: accessToken=<jwt_token>
```

## 📁 Cấu Trúc Dự Án

```
backend/
├── src/
│   ├── app.js                 # Entry point
│   ├── config/
│   │   ├── config.js         # Environment configuration
│   │   └── mongoose.js       # Database connection
│   ├── controllers/
│   │   ├── task.controller.js # Task business logic
│   │   └── user.controller.js # User authentication logic
│   ├── middleware/
│   │   └── auth.middleware.js # JWT authentication middleware
│   ├── models/
│   │   ├── tasks.js          # Task schema
│   │   └── users.js          # User schema
│   └── routes/
│       ├── task.route.js     # Task API routes
│       └── user.route.js     # User API routes
├── utils/
│   └── email.js              # Email utilities (TODO)
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Multi-container setup
├── package.json              # Dependencies
├── .env                      # Environment variables
├── PROJECT_OVERVIEW.md       # Detailed project overview
├── WORKFLOW.md              # Development workflow
└── README.md                # This file
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  username: String (required, trim),
  email: String (required, unique, validated),
  password: String (required, hashed, min 8 chars),
  phone: String (required, unique, validated),
  address: String (required, trim),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  deadline: Date,
  status: String (enum: ['todo', 'in-progress', 'done', 'cancelled']),
  labels: [String],
  owner: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

### JWT Token Flow
1. **Register/Login**: User nhận JWT token
2. **Token Storage**: Token được lưu trong HTTP-only cookie
3. **Authorization**: Mỗi request cần cookie `accessToken`
4. **Middleware**: `auth.middleware.js` verify token

### Security Features
- Password hashing với bcryptjs
- JWT token với expiration
- HTTP-only cookies
- Input validation
- Email và phone validation

## 🐳 Deployment

### Docker Deployment

```bash
# Build và chạy với Docker Compose
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down

# Rebuild containers
docker-compose build --no-cache
```

### Production Environment

```bash
# Production environment variables
NODE_ENV=production
MONGO_URI=<production-mongodb-uri>
JWT_SECRET=<strong-jwt-secret>
COOKIE_SECURE=true
COOKIE_SAME_SITE=strict
```

## 🧪 Testing

### API Testing với cURL

```bash
# Đăng ký user
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123","phone":"0123456789","address":"Test Address"}'

# Đăng nhập
curl -X POST http://localhost:3001/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Tạo task (sử dụng cookie từ login)
curl -X POST http://localhost:3001/tasks/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"Test Task","description":"Test Description","deadline":"2024-01-15T10:00:00.000Z"}'
```

### Testing Tools
- **Postman**: API testing
- **Thunder Client**: VS Code extension
- **curl**: Command line testing

## 📊 Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": {...},
  "page": 1,
  "limit": 10,
  "totalTasks": 25,
  "totalPages": 3
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🚦 HTTP Status Codes

- **200**: OK - Request thành công
- **201**: Created - Resource được tạo
- **400**: Bad Request - Dữ liệu không hợp lệ
- **401**: Unauthorized - Chưa xác thực
- **403**: Forbidden - Không có quyền
- **404**: Not Found - Resource không tồn tại
- **500**: Internal Server Error - Lỗi server

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Failed**
```bash
# Kiểm tra MongoDB service
docker-compose logs mongo

# Kiểm tra connection string
echo $MONGO_URI
```

**2. Authentication Errors**
```bash
# Kiểm tra JWT secret
echo $JWT_SECRET

# Verify token format
jwt.io
```

**3. Docker Issues**
```bash
# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📈 Performance

### Optimization Tips
- Implement database indexing
- Use connection pooling
- Optimize queries
- Implement caching
- Add rate limiting

### Monitoring
- Response times
- Database performance
- Memory usage
- Error rates

## 🤝 Đóng Góp

### Development Workflow

1. **Fork repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Create Pull Request**

### Code Standards
- Use ESLint for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Follow RESTful API conventions

## 📝 TODO / Roadmap

- [ ] Implement email notifications
- [ ] Add task categories/tags
- [ ] Implement task sharing
- [ ] Add comprehensive logging
- [ ] Write unit tests
- [ ] Add API rate limiting
- [ ] Implement file uploads
- [ ] Add real-time notifications
- [ ] Create admin dashboard
- [ ] Add data export/import

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Liên Hệ

- **Developer**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Project**: [Task Manager Backend](https://github.com/yourusername/task-manager-backend)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the database
- JWT.io for authentication
- Docker team for containerization

---

⭐ **Nếu dự án này hữu ích, hãy cho một star!**

*Được tạo với ❤️ bằng Node.js và Express.js*
