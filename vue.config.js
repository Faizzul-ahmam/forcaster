module.exports={
    css:{
        loaderOptions:{
            sass:{
                additionalData:`
                @import "@/style/main.sass"
                `
            },
            scss: {
                additionalData: `
                @import "@/style/main.scss";
                `
              }
        }
    }
}