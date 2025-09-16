export async function useFetchBlogContent() {
  const { data: contentBlog } = await useAsyncData('contentBlog', () =>
    queryContent('blog')
      .where({ _path: { $eq: '/blog' } })
      .findOne()
  );

  return { contentBlog };
}

export function useBlogPageHelpers() {
  const renderDateMonth = (fullDate: string) => {
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'short' });
    return { date, month };
  };

  const formatDateTime = (fullDate: string) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const newDate = new Date(fullDate);
    const date = newDate.getDate();
    const year = newDate.getFullYear();
    const day = weekday[newDate.getDay()];
    const month = newDate.toLocaleString('default', { month: 'short' });
    const time = newDate.getHours().toString().padStart(2,'0');
    const minute = newDate.getMinutes().toString().padStart(2,'0');
    const UTC = newDate
    const formatDate = `${day},  ${month} ${date}, ${year} ${time}:${minute}`
    return formatDate;
  };

  const renderDatePost = (fullDate: string) => {
    return fullDate.split("T")[0].split("-").join('/');
  };

  function convertToCapitalized(str: string) {
    if (!str) return '';
    return (
      str.charAt(0).toUpperCase().trimEnd() +
      str.slice(1).toLowerCase().trimEnd()
    );
  }

  const renderCateOrTag = (post: any, key: string) => {
    let object:any[] = [];
    if (key in post && Array.isArray(post[key]) && post[key].length > 0) {
      post[key].map((item: any, index: any) => {
        if (typeof item.text === 'string') {
          object.push({
            text:
              index !== post[key].length - 1
                ? `${convertToCapitalized(item.text)}`
                : convertToCapitalized(item.text),
            _path: `/blog/${key}/${item.text
              .toLowerCase()
              .trimEnd()
              .replace(/\s+/g, '-')}`,
            open_new_tab: item?.open_new_tab
          });
        }
      });
    }
    const dataRemoveDuplicate = object.filter((value, index, self) => {
      return index === self.findIndex((v) => v.text === value.text);
    });

    return dataRemoveDuplicate;
  };

  function toSlug(str:string) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
   
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
   
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
   
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
    
    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, '-');
   
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
   
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
   
    // return
    return str;
  }
 

  return { renderDateMonth, renderCateOrTag, renderDatePost, formatDateTime, toSlug };
}
