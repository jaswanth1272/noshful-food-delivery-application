const mongoose = require('mongoose');

const mongoURI='mongodb+srv://dbname:password@cluster0.t887sfl.mongodb.net/?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true , dbName: "noshfuldb"});
        console.log("Connected successfully");
        
        const fetchedData = await mongoose.connection.db.collection("food_items");
        const data = await fetchedData.find({}).toArray();
        const fetched_DataCat = await mongoose.connection.db.collection("foodCategory");
        const catData=await fetched_DataCat.find({}).toArray();
        {/*const fetch_discussions= await mongoose.connection.db.collection("discussions");
    const disc_data=await fetch_discussions.find({}).toArray();*/}
        //console.log(data);
        global.food_items=data;
        global.foodCategory=catData;
        //console.log(global.food_items);
    } catch (err) {
        console.log(err);
    }
};


module.exports=mongoDB;
