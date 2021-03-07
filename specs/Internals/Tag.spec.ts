import Tag from "../../src/Internals/Tag";

describe('Tag', function () {
    describe('stringify', function () {
        it('should return the correct dxf string', function () {
            const tag = new Tag(0, 'SECTION');
            expect(tag.stringify()).toBe('  0\nSECTION\n');
            tag.value = 'BLOCK';
            expect(tag.stringify()).toBe('  0\nBLOCK\n');
            tag.groupCode = 5;
            tag.value = 'A';
            expect(tag.stringify()).toBe('  5\nA\n');
        });
    });
});