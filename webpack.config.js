const path=require('path');
const htmlWebpackPlugin=require('html-webpack-plugin')
const webpack=require('webpack')


const isDev=process.env.NODE_ENV==='development';
const config={
	entry:{
		main:path.join(__dirname,'main.js'),
	},
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'dist/')
	},
	module:{
		rules:[
			{
				test:/\.jsx$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['env']
					}
				}
			}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'template.html')
		}),
		new webpack.DefinePlugin({
			'procsss.env':{
				NODE_ENV:isDev?'"development"':'"production"'
			}
		}),
		
	]
}


if(isDev){
	config.devtool='#cheap-module-eval-source-map'//便于调试
	config.devServer={
		// port:8000,
		// host:'0.0.0.0',
		overlay:{
			errors:true
		},
		hot:true//没有这个文件改动时页面会自动刷新更新，加上后页面不刷新更新
		        //需要配合HotModuleReplacementPlugin()插件
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),//热加载
		new webpack.NoEmitOnErrorsPlugin()
	)
}
module.exports=config;