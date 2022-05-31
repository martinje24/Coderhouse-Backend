console.clear();
const fs = require('fs').promises;
const Path = require('path');


class Contenedor{

    constructor(filePath,nameFile) {
        this.filePath=filePath
        this.nameFile=nameFile
        this.array = [
            {
                id: 1,
                title: "Calculator on github",
                thumbnail:"https://ahfarmer.github.io/calculator/",
                price: 123
            },
            {
                id: 2,
                title: "Tutorial: Intro to React",
                thumbnail:"https://reactjs.org/tutorial/tutorial.html",
                price: 456
            }
        ];
    };

    async checkExistence() {
        let filePath=this.filePath;
        let nameFile=this.nameFile;
        let array=this.array;
        try {
            await new Promise(function (resolve, reject) {
                const pathFile = Path.join(filePath, nameFile);
                if (fs.existsSync(pathFile)) {
                    resolve();
                } else {
                    reject();
                }
            });
            console.log('File ' + nameFile + ' found successfully!');
            console.log("Let's code!");
        } catch {
            console.log('File or directory doesn\'t found');
            console.log('Proceed to create one with the same name');
            fs.mkdir(filePath, { recursive: true }).catch(console.error);
            
            //This function needs to be SaveObj function as in the homework
            fs.writeFile(Path.join(filePath, nameFile), JSON.stringify(array, null, '\t'));
        }
    }

    async getAll(){
        let object=await fs.readFile(this.filePath+this.nameFile)
        return JSON.parse(object)
    }

    async getById(id){
        let json_file=await this.getAll();
        let json_stage_file=json_file.find(key=>key.id==id);
        return json_stage_file;
    }

    async deleteAll(){
        await fs.writeFile(`${this.filePath}${this.nameFile}`,'[]');
        console.log('All objects were deleted successfully');
    }

    async deleteById(id){
        //let json_file=await this.getAll();
        let new_obj_array = []
        await fs.readFile(`${this.filePath}${this.nameFile}`,'utf-8')
        .then( content => {
            let all_json_content = JSON.parse(content)
            for (const extract of all_json_content) {
                if(extract.id != id) {
                    new_obj_array.push(extract)
                }
            }
        })
        .catch( err => console.log(err));
        await fs.writeFile(`${this.filePath}${this.nameFile}`, JSON.stringify(new_obj_array, null, '\t'));
        console.log(`Equipment with ID ${id} deleted...`);
    }

    async save(agregar){
        let testObj=await this.getAll()
        let id_array=[]
        for (const property in testObj){
            id_array.push(testObj[property].id)
            //console.log(testObj[property].id)
        }
        let new_id=Math.max(...id_array)+1
        console.log(`The new ID is: ${new_id}`)
        let newObj={id:new_id,...agregar}
        testObj.push(newObj)

        try{
            await fs.writeFile(`${this.filePath}${this.nameFile}`, JSON.stringify(testObj, null, '\t'));
            return testObj
        }catch{
            throw new Error(`There was an issue trying to saving: ${error}`)
        }
        
    }

}



//================ For testing =================
async function main(){
    let filePath="C:/temp/" //Specify the path 
    let nameFile="productos.txt"
    let test=new Contenedor(filePath,nameFile)
    let agregar={
        title: "New array Element",
        thumbnail:"https://bobbyhadz.com/blog/javascript-get-index-of-max-value-in-array",
        price: 789
    } 

    console.log("==== Testing validate file existence =====")
    await test.checkExistence();

    console.log("==== Testing get all =====")
    let object=await test.getAll();
    console.log(object)

    console.log("==== Testing byID =====")
    let res=await test.getById(2);
    console.log(res)

    console.log("==== Testing DeletingbyID =====")
    await test.deleteById(2);
    let res2=await test.getAll();
    console.log(res2)

    console.log("==== Testing Saving New Object =====")
    let res3=await test.save(agregar);
    console.log(res3)

    console.log("==== Testing delete all =====")
    await test.deleteAll();
}

main()




