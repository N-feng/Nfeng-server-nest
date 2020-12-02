import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

@Resolver("App")
export class AppResolver {
  @Query("hello")
  hello() {
    return "你好 nestjs";
  }
  @Query("findNav")
  findNav(@Args("id") id) {
    console.log(id);
    return {
      id: id,
      title: "新闻111-" + id,
      url: "www.itying.com",
    };
  }
  /*
    query{
        navs{
            title,
            url
        }
        }
    */
  @Query("navs")
  navs() {
    return [
      {
        id: 1,
        title: "新闻111",
        url: "www.itying.com",
      },
      {
        id: 2,
        title: "新闻222",
        url: "bbs.itying.com",
      },
    ];
  }

  /*
    mutation{  
        addNav(nav:{title:"graphql 数据",url:"itying.com"}){
            id,title,url
        }
    }
    */

  @Mutation("addNav")
  addNav(@Args("nav") nav) {
    console.log(nav);
    return {
      id: 100,
      title: nav.title,
      url: nav.url,
    };
  }
}
