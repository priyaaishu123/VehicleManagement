const express=require('express');
const bodyParse=require('body-parse');
const {Sequelize,DataTypes} =require('sequelize');

const app=express();
const port=3000;

app.use(bodyParse.json());
const sequelize=new sequelize('vehiclemanagement','root','root',{
dialect:'mysql',
host :'localhost'
});

const Vehicle=sequelize.define('Vehicle',{vechile_id:{type:DataTypes.STRING,primaryKey:true},
vin:DataTypes.STRING(17),
make:DataTypes.STRING(100),
model:DataTypes.STRING(100),
year:DataTypes.INTEGER




});

sequelize.sync()
.then(()=> {
    console.log('Database Table Created');
})
.catch(err=> {
    console.error('Error syncing database:',err);
});

app.post('/api/createVehicle',async(req,res)=>{
try{
    const{vin,make,model,year}=req.body;
    const vehicle=await Vehicle.create({
        vehicle_id:generateUniqueId(),vin,make,model,year
});
res.status(201).json(vehicle);
}catch(err){
    console.error('Error creating vehicle',err);
    res.status(500).json({error:'Internal server error'});
}
});
app.listen(port,()=>{
    console.log('Server running on http://localhost:${port}');
});