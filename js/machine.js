export default class Machine {

    constructor(type, vcpu, memory, disk) {
        this.type = type;
        this.vcpu = vcpu;
        this.memory = memory;
        this.disk = disk;
    }

    increaseVcpu() {
        this.vcpu += 2;
    }
}