module.exports = {
	css: {
		loaderOptions:{
			sass: {
				prependData: `
                    @import "@/assets/styles/variables.scss";
                    @import "@/assets/styles/font.scss";
                    @import "@/assets/styles/transitions.scss";
                `
			}
		}
	},
}
