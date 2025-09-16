const fs = require('fs');
const axios = require('axios');

async function generateRoutesFromApi() {
  const pageRoutes = [];
  let listProductCate = []; 

  try {
    const getProductCate = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-api.srv01.dtsmart.dev/api/v1/frontend/product`
        );
        listProductCate = res.data?.data?.items || []; 
      } catch (error) {
        console.error("Lỗi khi lấy danh mục sản phẩm:", error);
      }
    };

    await getProductCate();

    listProductCate.forEach(item => {
      if (item && item.slug) {
        pageRoutes.push(`/chi-tiet-san-pham/${item.slug}`);
      }
    });

    appendRoutesToNuxtConfig(pageRoutes);
  } catch (error) {
    console.error("Lỗi trong quá trình tạo routes:", error);
  }
}

function appendRoutesToNuxtConfig(newRoutes) {
  const configPath = './nuxt.config.ts';
  
  fs.readFile(configPath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Lỗi khi đọc file nuxt.config.ts:", err);
      return;
    }

    const currentRoutesMatch = data.match(/routes:\s*(\[[^\]]*\])/);
    let currentRoutes = [];

    if (currentRoutesMatch) {
      currentRoutes = JSON.parse(currentRoutesMatch[1].replace(/'/g, '"'));
    }

    const combinedRoutes = Array.from(new Set([...currentRoutes, ...newRoutes]));

    const updatedConfig = data.replace(/routes:\s*\[[^\]]*\]/, `routes: ${JSON.stringify(combinedRoutes).replace(/"/g, "'")}`);

    fs.writeFile(configPath, updatedConfig, 'utf-8', (err) => {
      if (err) {
        console.error("Lỗi khi ghi vào file nuxt.config.ts:", err);
        return;
      }
      console.log("nuxt.config.ts đã được cập nhật thành công với các routes sản phẩm!");
    });
  });
}

generateRoutesFromApi();
