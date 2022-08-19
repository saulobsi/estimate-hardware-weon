
// import {Machine} from '/js/Machine.js';

// Valor padrão de agentes por node
const MIN_AGENTS_BY_VOICE_NODE = 30;
const MIN_AGENTS_BY_DOCKER_NODE = 10;
const MIN_HARD_DISK = 100;


let machines = [];

/**
 * Estima o recurso de HW necessário para a operação
 */
function estimate() {
    machines = [];
    console.log("Estimando o HW necessário");

    let agents = $("#agents").val();

    estimateDockerNode2();

    //Calcula quantas voice nodes
    console.log("VoiceNodes:" + estimateVoiceNodes(agents));

    // console.log(estimateDockerNode2());

    estimateQueueBalance(agents);
    displayResult(machines);
}

/**
 * Calcula quantas voiceNodes são necessárias baseado na quantidade de agentes
 * @param int agents 
 */
function estimateVoiceNodes(agents) {

    for (let i=1; i<= Math.ceil(agents / MIN_AGENTS_BY_VOICE_NODE); i++) {
        let machine = {
            "type" : `VOICE NODE ${i}`,
            "vcpu" : 2,
            "memory" : 10,
            "disk" : 150
        }
        machines.push(machine)
    }
}

function estimateDockerNode1() {
    
}

function estimateDockerNode2() {
    let machine = {
        "type" : 'DOCKER NODE 2',
        "vcpu" : 2,
        "memory" : 15,
        "disk" : 150
    }
    machines.push(machine);
}

function estimateMemoryByVoiceNode() {

}

function estimateMemoryByDockerNode() {
    return MIN_AGENTS_BY_DOCKER_NODE;
}

function estimateQueueBalance(agents) {
    if(agents >= 90) {
        let machine = {
            "type" : 'QUEUE BALANCE',
            "vcpu" : 4,
            "memory" : 15,
            "disk" : 100
        }
        machines.push(machine);
    }
}

function displayResult(machines) {
    $("#div_result").empty();
    let html = '<table class="uk-table uk-table-small uk-table-striped">';
    for(let machine of machines) {
         html += `<tr> <th> ${machine.type} </th> <td> </td> </tr> <tr> <td> Memória </td> <td> ${machine.memory} GB </td> </tr> <tr> <td> VCPU </td> <td> ${machine.vcpu}</td> </tr> <tr> <td> Hard Disk </td> <td> ${machine.disk} GB </td> </tr>`
    }
    html += '</table>';
    $("#div_result").append(html);
}