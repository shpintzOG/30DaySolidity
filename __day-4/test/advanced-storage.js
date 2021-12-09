const AdvancedStorage = artifacts.require('AdvancedStorage');

// uses mocha framework
contract('AdvancedStorage', () => {
  let advancedStorage = null;

  // Contract instanctance
  before(async () => {
    advancedStorage = await AdvancedStorage.deployed();
  })

  it('should add and element to ids array', async () => {
    
    await advancedStorage.add(10)
    const result = await advancedStorage.ids(0)
    assert(result.toNumber() === 10);
  })

  it('should get an element of the ids array', async () => {
    await advancedStorage.add(20);
    const result = await advancedStorage.get(1);
    assert(result.toNumber() === 20);

  })

  it('should get all values in array', async () => {

    const rawIds = await advancedStorage.getall()
    const ids = rawIds.map(id => id.toNumber());

    assert.deepEqual(ids, [10,20])

  })


  it('should get the length of the array storage', async () => {

    const result = await advancedStorage.length()

    assert(result.toNumber() === 2);
    
  })


})