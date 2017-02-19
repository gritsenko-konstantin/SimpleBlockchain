
var nodes = require('../lib/nodes');
var blocks = require('../lib/blocks');
var transactions = require('../lib/transactions');
var utils = require('../lib/utils');

exports['create node'] = function (test) {
	var node = nodes.node();
	
	test.ok(node);
	test.equal(typeof node, 'object');
};

exports['add genesis block'] = function (test) {
    var genesis = blocks.block();
	var node = nodes.node();
	
	node.addBlock(genesis);
	
	var best = node.bestBlock();
	
	test.ok(best);
	test.equal(best.number, genesis.number);
	test.equal(best.hash, genesis.hash);
};

exports['add transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;
    
    var tx = transactions.transfer(from, to, value);
	
	var node = nodes.node();
	
	node.addTransaction(tx);

	var txs = node.transactions();
	
	test.ok(txs);
	test.ok(Array.isArray(txs));
	test.equal(txs.length, 1);
	
	var ntx = txs[0];
	
	test.equal(ntx.id, tx.id);
	test.equal(ntx.to, tx.to);
	test.equal(ntx.value, tx.value);
	test.equal(ntx.from, tx.from);
};

