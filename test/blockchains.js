
var blockchains = require('../lib/blockchains');
var blocks = require('../lib/blocks');

exports['create blockchain'] = function (test) {
    var genesis = blocks.block();
    var bc = blockchains.blockchain(genesis);
    
    test.ok(bc);
    test.equal(typeof bc, 'object');
    test.equal(bc.bestBlock(), genesis);
};

exports['add block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    
    test.equal(bc.bestBlock(), block);
};

exports['add block same height'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock(), block);
};