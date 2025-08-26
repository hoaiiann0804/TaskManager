# Quy Trình Làm Việc - Task Manager Project

## 📋 Tổng Quan Dự Án

Dự án Task Manager là một ứng dụng quản lý công việc được xây dựng với:

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Containerization**: Docker + Docker Compose

## 🚀 Quy Trình Phát Triển

### 1. Thiết Lập Môi Trường Phát Triển

#### Yêu Cầu Hệ Thống

- Node.js (v14+)
- Docker & Docker Compose
- Git

#### Cài Đặt Dự Án

```bash
# Clone repository
git clone <repository-url>
cd Task_Manager/backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
```

#### Cấu Hình Environment Variables

```env
MONGO_URI=mongodb://anlangthang:123456@localhost:27017/task-manager?authSource=admin
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

### 2. Khởi Chạy Dự Án

#### Sử Dụng Docker (Khuyến Nghị)

```bash
# Khởi chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

#### Chạy Local Development

```bash
# Khởi chạy MongoDB (nếu không dùng Docker)
mongod

# Chạy server
npm start
# hoặc
node src/app.js
```

### 3. Cấu Trúc Dự Án

```
backend/
├── src/
│   ├── app.js              # Entry point
│   ├── config/
│   │   └── mongoose.js     # Database connection
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication, validation
│   ├── models/            # Database schemas
│   └── routes/            # API endpoints
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Multi-container setup
├── package.json          # Dependencies
└── .env                  # Environment variables
```

### 4. Quy Trình Phát Triển Feature

#### Bước 1: Tạo Branch Mới

```bash
git checkout -b feature/ten-feature
```

#### Bước 2: Phát Triển

1. **Tạo Model** (nếu cần)

   - Định nghĩa schema trong `src/models/`
   - Thiết lập validation và relationships

2. **Tạo Controller**

   - Implement business logic trong `src/controllers/`
   - Handle CRUD operations
   - Error handling

3. **Tạo Routes**

   - Định nghĩa API endpoints trong `src/routes/`
   - Apply middleware (authentication, validation)

4. **Testing**
   - Test API endpoints với Postman/Thunder Client
   - Kiểm tra database operations

#### Bước 3: Code Review & Merge

```bash
# Commit changes
git add .
git commit -m "feat: thêm feature xyz"

# Push to remote
git push origin feature/ten-feature

# Tạo Pull Request
```

### 5. API Development Guidelines

#### Authentication Flow

1. **Register**: `POST /users/register`
2. **Login**: `POST /users/login`
3. **Protected Routes**: Sử dụng JWT middleware

#### Error Handling

```javascript
// Consistent error response format
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error info"
}
```

#### Response Format

```javascript
// Success response
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### 6. Database Management

#### MongoDB Operations

```bash
# Connect to MongoDB container
docker exec -it mongo mongo -u anlangthang -p 123456

# Backup database
mongodump --uri="mongodb://anlangthang:123456@localhost:27017/task-manager?authSource=admin"

# Restore database
mongorestore --uri="mongodb://anlangthang:123456@localhost:27017/task-manager?authSource=admin" dump/
```

### 7. Deployment Process

#### Production Deployment

1. **Environment Setup**

   ```bash
   # Production environment variables
   NODE_ENV=production
   MONGO_URI=<production-mongodb-uri>
   JWT_SECRET=<strong-jwt-secret>
   ```

2. **Docker Deployment**

   ```bash
   # Build production image
   docker build -t task-manager-backend .

   # Run production container
   docker-compose -f docker-compose.prod.yml up -d
   ```

### 8. Monitoring & Maintenance

#### Health Checks

- Server status: `GET /health`
- Database connection: Monitor MongoDB logs
- Application logs: `docker-compose logs -f web`

#### Performance Monitoring

- Response times
- Database query performance
- Memory usage
- Error rates

### 9. Troubleshooting

#### Common Issues

1. **Database Connection Failed**

   - Kiểm tra MongoDB service status
   - Verify connection string
   - Check network connectivity

2. **Authentication Errors**

   - Verify JWT secret configuration
   - Check token expiration
   - Validate user credentials

3. **Docker Issues**
   ```bash
   # Rebuild containers
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

### 10. Best Practices

#### Code Quality

- Sử dụng ESLint cho code formatting
- Implement proper error handling
- Write meaningful commit messages
- Add comments cho complex logic

#### Security

- Validate all input data
- Use HTTPS in production
- Implement rate limiting
- Regular security updates

#### Performance

- Implement database indexing
- Use connection pooling
- Optimize queries
- Implement caching where appropriate

## 📞 Liên Hệ & Hỗ Trợ

- **Developer**: [Tên Developer]
- **Email**: [email@example.com]
- **Documentation**: [Link to detailed docs]
- **Issue Tracking**: [Link to issue tracker]

---

_Tài liệu này được cập nhật thường xuyên. Vui lòng kiểm tra phiên bản mới nhất trước khi bắt đầu phát triển._

// Các ENDPOINT
Phương thức Đường dẫn Mô tả
POST /api/register Đăng ký
POST /api/login Đăng nhập
GET /api/tasks Lấy tất cả task
POST /api/tasks Tạo task mới
PUT /api/tasks/:id Cập nhật task
DELETE /api/tasks/:id Xóa task
GET /api/tasks?status=done Lọc theo trạng thái
GET /api/tasks?sort=deadline Sắp xếp theo deadline
