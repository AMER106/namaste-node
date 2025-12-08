# namaste-node
# DAY-01 
=> create the namaste node project with help of npm init or npm init -y to skip the default setup.
=>in the folder structure, we can see the package.json file. as we can see only name, version, scripts as of now. if you use npm init , manually we need to respond to these questions./
=> we are using express as a server, to include it in our project , first we need to install the express package. to install it, use npm i express or npm install express.
=> if you observe the folder structure now, you can see the nodemodules folder and package_lock.json file. 
# we installed only express as of now, but why we see lot of packages in the node modules folder?
=> it's because of if we open the express package folder in the node modules, you see lot of other packages also. so by default, it creates other packages also.
# what is package.json?
=> when we install the express package, if you open the package.json file, you see the express: version in the dependency. whatever the packages we installed we see those packages here. 
=>these versions are start with either carat(^) or tilde(~). in the most cases you only see the (^) symbol. because if we use this, it automatically updates the new patches that were updated.
=> our versions are segragted into three points, MAJOR, MINOR, PATCH. like express: ^14.2.1.
=>if the express team released any patch or minor updates, this ^ will automatically updates, if you really want to see which version you are using,you need to open the package-lock.json file. and search for the express, and here u can see the exact version we are using.
# create a server?
=>now it's time to create a server, we already installed the express server in our project with the help of npm i express .
=> to use this express, we need to import this package.
=>import express from 'express'
cosnt app= express(); express is a fucntion we are calling and with the help of app variable name we can use it.
=>now we created the server, it's time to listen the requests. for this we have a method called listen, app.listen(3000,()=>{console.log("server is successfully running on port 3000}))
=>to check whether our server is running or not, we need to use the same command node src/app.js, everytime we need to use this command if we are making any changes. so we need to install
the another package that is nodemon. npm i -g nodemon.
=>now use nodemon src/app.js, wait don't u think it's handy to right this too. so we need to change our scripts in the package.json file.
dev:nodemon src/app.js and use npm run dev  to run the project.
