import { prisma } from "../../lib/prisma.js";

export const createOrganizationService = async (ownerId:number,name:string)=>{
    if(!ownerId||!name){
        return {
            data:null,
            message:"Required fields are missing",
            statusCode:400
        }
    }
    let organization = await prisma.organization.findUnique({where:{name}});

    if(organization){
        return{
            data:null,
            message:"Name is already taken",
            statusCode:400
        }
    }

    organization = await prisma.organization.create({data:{ownerId,name}});

    return {
        data:organization,
        statusCode:201,
        message:"Organization created!"
    }
}