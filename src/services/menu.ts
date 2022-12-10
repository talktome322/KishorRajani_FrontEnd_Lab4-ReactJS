import axios from "axios";
import IDataList from "../model/IDataList";

// Use to get data from db.json via json server
const getItems = () => {
    return axios.get<IDataList[]>('http://localhost:3001/items')
                .then(response => response.data)
}


// Use to post data in db.json via json server
const addNewItem = (newItemData: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>('http://localhost:3001/items', newItemData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => console.log(response))
}

export { getItems, addNewItem }