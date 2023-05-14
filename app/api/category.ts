import client from "./client";

const endPoint = "/category";

const getCategories = () => client.get<any>(endPoint);

export default{
    getCategories
}