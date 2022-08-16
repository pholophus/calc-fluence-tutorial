import { Fluence } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import {registerCalc, CalcDef, demoCalculation} from "./_aqua/calculator"

class Calculator implements CalcDef {
    private _state: number = 0;

    add(n: number) {
        this._state += n;
    }

    subtract(n: number){
        this._state -= n;
    }

    multiply(n: number){
        this._state *= n;
    }

    divide(n: number){
        this._state /= n;
    }

    reset(){
        this._state = 0;
    }

    getResult(){
        return this._state;
    }
}

// const keypress = async () => {
//     // process.stdin.on('data', data => {
//     //     console.log(`You typed ${data.toString()}`);
//     //     process.exit();
//     // });

//     process.stdin.setRawMode(true);
//     return new Promise<void>((resolve) =>
//       process.stdin.once("data", (data) => {
//         if(data.toString() == "plus"){
//             console.log("masuk")
//         }
//         resolve();
//       })
//     );
// };

const keypress = async (calc: any) => {
    process.stdin.setRawMode(true);
    return new Promise<void>((resolve) =>
      process.stdin.on("data", (data) => {
        console.log(`data ---> ${data.toString()}`)

        calc.add(data)
        console.log(calc.getResult());

        process.stdin.setRawMode(false);
        resolve();
      })
    );
  };


async function main(){
    await Fluence.start({
        connectTo: krasnodar[0],
    });

    registerCalc(new Calculator());

    console.log("start\n");
    console.log("peer id ---> ", Fluence.getStatus().peerId);
    console.log("\nrelay peer id ---> ", Fluence.getStatus().relayPeerId);
    console.log("\npress any key to continue");

    const calc = new Calculator()

    await keypress(calc);

    await Fluence.stop();
}

async function f() {
    // return await demoCalculation()

    await Fluence.start({
        connectTo: krasnodar[0],
    });

    try{
        console.log(await demoCalculation())
    }catch(e){
        return e
    }

    await Fluence.stop();
}

f();
// main();


