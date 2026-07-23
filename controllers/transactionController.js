const Transaction = require("../models/Transaction");


// CREATE

exports.addTransaction = async(req,res)=>{

    try{

        const transaction = await Transaction.create({
            ...req.body,
            userId:req.user.id
        });

        res.json(transaction);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


// READ

exports.getTransactions = async(req,res)=>{

    try{

        const data = await Transaction.find({
            userId:req.user.id
        });

        res.json(data);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


// UPDATE

exports.updateTransaction = async(req,res)=>{

    try{

        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(updated);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// DELETE

exports.deleteTransaction = async(req,res)=>{

    try{

        await Transaction.findByIdAndDelete(req.params.id);

        res.json({
            message:"Transaction deleted"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};