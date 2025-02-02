## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoint

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

<table>
    <thead>
        <tr>
            <th>Module</th>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Products</td>
            <td>POST</td>
            <td>/products</td>
            <td>สร้างสินค้าใหม่</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products</td>
            <td>เรียกดูสินค้าทั้งหมด</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products/:id</td>
            <td>เรียกดูสินค้าจาก id product</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>PATCH</td>
            <td>/products/:id</td>
            <td>แก้ไขสินค้าจาก id product</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>PUT</td>
            <td>/products/:id</td>
            <td>แก้ไขข้อมูลทั้งหมด</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>DELETE</td>
            <td>/products/:id</td>
            <td>ลบสินค้าจาก id product</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products/export</td>
            <td>ส่งออกข้อมูลสินค้าทั้งหมดเป็นไฟล์ CSV</td>
        </tr>
        <tr>
            <td>User</td>
            <td>POST</td>
            <td>/user/register</td>
            <td>ลงทะเบียนผู้ใช้งานใหม่</td>
        </tr>
        <tr>
            <td>User</td>
            <td>GET</td>
            <td>/user/profile</td>
            <td>เรียกดูโปรไฟล์ของผู้ใช้งานที่เข้าสู่ระบบ (ต้องใช้การตรวจสอบ JWT)</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>POST</td>
            <td>/email/send</td>
            <td>เพิ่มงานอีเมลเข้าสู่คิว</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>GET</td>
            <td>/email/status/:id</td>
            <td>เรียกดูสถานะของงานอีเมลตามid</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>GET</td>
            <td>/email/log-all-jobs</td>
            <td>แสดงงานอีเมลคิวทั้งหมด</td>
        </tr>
        <tr>
            <td>Orders</td>
            <td>POST</td>
            <td>/orders</td>
            <td>สร้างคำสั่งซื้อใหม่</td>
        </tr>
        <tr>
            <td>Orders</td>
            <td>GET</td>
            <td>/orders</td>
            <td>เรียกดูคำสั่งซื้อทั้งหมด</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>POST</td>
            <td>/auth/login</td>
            <td>ผู้ใช้งานเข้าสู่ระบบ</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>POST</td>
            <td>/auth/register</td>
            <td>ลงทะเบียนผู้ใช้งานใหม่</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/logout</td>
            <td>ออกจากระบบผู้ใช้งานที่เข้าสู่ระบบ (ต้องใช้การตรวจสอบ JWT)</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/refresh</td>
            <td>รีเฟรชโทเคนสำหรับการเข้าถึงและโทเคนรีเฟรช (ต้องใช้การตรวจสอบโทเคนรีเฟรช)</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/profile</td>
            <td>เรียกดูโปรไฟล์ของผู้ใช้งานที่เข้าสู่ระบบ (ต้องใช้การตรวจสอบ JWT)</td>
        </tr>
    </tbody>
</table>

##CONFIG

DB_PORT=yourport
DB_HOST=yourlocalhost
DB_USER=yourroot
DB_PASSWORD=your
DB_NAME=your db name
DB_NAME2=your db name
JWT_SECRET=''
JWT_REFRESH_SECRET=''
REDIS_HOST='yourlocalhost'
REDIS_PORT=yourport
