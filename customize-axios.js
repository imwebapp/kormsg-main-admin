const fs = require("fs");

// Đọc nội dung của tệp Axios từ node_modules
let axiosContent = fs.readFileSync("node_modules/axios/index.d.ts", "utf8");

// Tìm chuỗi định nghĩa interface AxiosResponse
// const axiosResponseInterfaceRegex = /export\s+interface\s+AxiosResponse\s*<\s*(\w+)\s*=\s*any\s*,\s*(\w+)\s*=\s*any\s*>/;
const axiosResponseInterfaceRegex =
  /export\s+interface\s+AxiosResponse\s*<\s*(\w+)\s*=\s*any\s*,\s*(\w+)\s*=\s*any\s*>\s*{/;

// Kiểm tra xem interface AxiosResponse có tồn tại không
if (axiosResponseInterfaceRegex.test(axiosContent)) {
  // Thêm thuộc tính results vào interface AxiosResponse
  axiosContent = axiosContent.replace(
    axiosResponseInterfaceRegex,
    `export interface AxiosResponse<T = any, D = any> {
          results?: T; // Thêm thuộc tính results vào đây`
  );

  // Ghi lại nội dung đã thay đổi
  fs.writeFileSync("node_modules/axios/index.d.ts", axiosContent, "utf8");

  console.log("Customizing Axios complete!");
} else {
  console.log("AxiosResponse interface not found!");
}
