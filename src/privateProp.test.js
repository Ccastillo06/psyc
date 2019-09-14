import {
  NO_CLASS_KEY_ERROR,
  addPrivateProp
} from './privateProp';

class MockAnimal {
  constructor() {}
}

describe('Test addPrivateProp', () => {
  it('should throw an error when no class or key are defined', () => {
    expect(() => addPrivateProp(null)).toThrow();
  });

  it('should throw an error with a message NO_CLASS_KEY_ERROR', () => {
    try {
      addPrivateProp(null);
    } catch (error) {
      expect(error.message).toBe(NO_CLASS_KEY_ERROR);
    }
  });

  it('should return the private key when adding to a class', () => {
    const name = 'Dog';

    const animal = new MockAnimal();
    const _name = addPrivateProp(animal, 'name', name);

    expect(animal[_name]).toBe(name);
  });

  it('should not have an accesible private key when creating a similar symbol', () => {
    const name = 'Dog';

    const animal = new MockAnimal();
    const _name = addPrivateProp(animal, 'name', name);

    const _newName = Symbol('name');
    expect(animal[_name]).toBe(name);
    expect(animal[_newName]).toBe(undefined);
  });

  it('should have getPrivate and setPrivate methods after adding a private property', () => {
    const name = 'Dog';
    const newName = 'Cat';

    const animal = new MockAnimal();
    const _name = addPrivateProp(animal, 'name', name);

    expect(animal.getPrivate(_name)).toBe(name)
    animal.setPrivate(_name, newName)
    expect(animal.getPrivate(_name)).toBe(newName)
  });
});
