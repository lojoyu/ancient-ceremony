import {ardfilters} from './const'

//TODO: change to INIT part!!!
const ports = await navigator.serial.getPorts({ardfilters});
console.log(ports[0]);
// await ports[0].open({ baudRate: 9600 });

export default class ArdSerial{
    constructor(baudRate=9600) {
        if (! ("serial" in navigator)) {
            console.log('NOT SUPPORT!!!!');
            return;
        }
        this.open = false;
        this.port = ports[0];

        this.port.open({ baudRate: baudRate }).then(()=>{
            this.open = true;
            this.reader = this.port.readable.getReader();
            this.reader.read().then(this.gyrodata);
        });
        
    }

    getGyro() {
        this.reader.read().then(this.gyrodata);
        return this.gyro;
        //console.log('open', this.open);
    }

    gyrodata = ({ value, done })=>{
        //if (!this.s) return;
        //const { value, done } = await reader.read();
        if (done) {
            console.log('DONE');
            // Allow the serial port to be closed later.
            this.reader.releaseLock();
            //this.reader.read().then(this.gyrodata);
            return;
        }
        // value is a Uint8Array.
        let v = new TextDecoder().decode(value).split('\n').at(-2);
        //console.log(v);
        let g = parseFloat(v);
        if (g != NaN && v != undefined) {
            this.gyro = g;
        }
        
    }

    
}