import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service'

@Resolver('Users')
export class UsersResolver {

    constructor(private usersService: UsersService){}

    /*
        query{  
            findUser(id: "5f7c380818cdaf11aedcdabd"){
                _id,
                username,
                createdAt,
                updatedAt
            }
        }
    */
    @Query('findUser')
    async findUser(@Args("id") id){
        let userResult=await this.usersService.find({"_id":id})
        return userResult[0]
    }


    /*
        query{
            userList{
                _id,
                username,
                createdAt,
                updatedAt
            }
        }
    */
    @Query('userList')
    async userList() {
        //获取user表以及role表关联数据
        const result = await this.usersService.getModel().aggregate([
            {
                $lookup: {
                    from: "role",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "role"
                }
            }
        ])
        return result
        const list = result.map((item) => {
            item.roleName = item.role[0].title
            delete item.role
            return item
        })
        
        return list
        return { code: 200, data: { list } }
    }

    /*
        mutation{
            addUser(user:{username: "111"}) {
                _id,
                username,
                createdAt,
                updatedAt
            }
        } 
    */
    @Mutation("addUser")
    async addUser(@Args("user") user){
       console.log(user)
       return user
    //    const password = this.toolsService.getMd5(body.password)
    //         await this.userService.create({ ...body, password })
    //    let result = await this.usersService.create(user)
    //    return result

    }
}
