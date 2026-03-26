import { create } from 'zustand'
import axios from 'axios'

//zustand
const todoStore = create((set) => ({
    data:[],
    save: async function(value){
        try{
            let res = await axios.post(process.env.REACT_APP_APIURL,value) //.env변수사용시=> process.env.+변수
            set(function(item){
                return {data:[...item.data, res.data.data]}
            });

            if(!res.data.success){
                throw new Error(res.data.msg);
            }
        }
        catch(err){
            console.log(`에러발생 : ${err}`);          
        }
    },
    get: async function(value){
        const res = await axios.get(`${process.env.REACT_APP_APIURL}?sort=${value}`); //.env변수사용시=> process.env.+변수
        set({data:res.data});
    },
    update: async function(){},
    del: async function(id){
        try{
            const res = await axios.delete(`${process.env.REACT_APP_APIURL}?id=${id}`); //.env변수사용시=> process.env.+변수
            if(!res.data.success) throw new Error('에러발생')
            set(function(item){
                return {data:item.data.filter(obj=>obj._id !== id)}
            });
        }
        catch(err){

        }
    },
    completeTodo: async function(id){
        const res = await axios.put(
            `${process.env.REACT_APP_APIURL}?id=${id}`, //.env변수사용시=> process.env.+변수
            {isdone:true}
        );
        set(function(item){
            let updateData = item.data.map(function(obj){
                if(obj._id == id){
                    obj.isdone = true;
                }
                return obj;
            });
            return {data:updateData}
        });
    }
}))

export default todoStore