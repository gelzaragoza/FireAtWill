module.exports ={
    home: function(req,res,next){
        if(req.session.type=="client"){
            res.redirect("/client");
        }else if(req.session.type=="admin"){
            res.redirect("/admin");
        }else{
            next();
        }
    },
    client: function(req,res,next){
        if(!(req.session.type=="client")){
            if(req.session.type=="admin"){
                res.redirect("/admin");
            }else if(req.session.type=="guest"){
                res.redirect("/");
            }
        }else{
            next();
        }
    },
    admin: function(req,res,next){
        if(!(req.session.type=="admin")){
            if(req.session.type=="client"){
                res.redirect("/client");
            }else if(req.session.type=="guest"){
                res.redirect("/");
            }
        }else{
            next();
        }
    }
}