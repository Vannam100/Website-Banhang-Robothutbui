export default defineNuxtPlugin( async (nuxtApp) => {
  const { toSlug } = useBlogPageHelpers();

   const router = useRouter();

   const blogStore = useCounterStore()
 
   const listCategory: any[] = [];
   
   const listTag: any[] = [];
 
   await blogStore.fetchPosts();
 
   const posts = blogStore.posts;
 
   blogStore.blockActions(posts);

   function convertToCapitalized(str:string) {
     if (!str) return ''; 
     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
   }
 
   const generateData = (data:any[],list:any[],key:any) =>{
     data.map((post:any) => {
       if(key in post && Array.isArray(post[key]) && post[key].length > 0) {
         post[key].forEach(category => {
           if (typeof category?.text === 'string' && category?.text.trim() !== '' && category?.text !== null) {
             let existCategory = list.find(elm =>         
               elm.text.toLowerCase().trimEnd() === category?.text.toLowerCase().trimEnd() || 
               elm._path.toLowerCase().trimEnd() === category?.text.toLowerCase().trimEnd()
             )
             if (!existCategory) {
               list.push({
                 text: convertToCapitalized(category?.text),
                 name:`${category?.text.toLowerCase().trimEnd().replace(/\s+/g, '-')}`,
                 open_new_tab: category?.open_new_tab,
                 _path: '/' + toSlug(category?.text)                 
               });
             }
           }   
         })
       }
     })
   }
   generateData(posts,listCategory,'category')
   generateData(posts,listTag,'tags')
 
   blogStore.categoryAction(listCategory);
   blogStore.tagAction(listTag);
 
   
   const addRoutes = (list:any[], basePath:string) => {
     if (list.length < 0) return
 
     list.forEach(route => {
       router.addRoute(basePath,{
         name: route.name,
         path: `${route._path}`,
         component: [],
       });
     });     
   };
 
   addRoutes(listCategory, '/blog/category');
   addRoutes(listTag, '/blog/tags');
 
 });