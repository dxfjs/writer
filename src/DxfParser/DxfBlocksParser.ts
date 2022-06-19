import Tokenizer, { section } from './Tokenizer';

export default class DxfBlocksParser {
    parse(tokenizer: Tokenizer) {
        tokenizer.advance(2)
        while (tokenizer.hasNext() && tokenizer.exceptSectionOrEof()) {
            //console.log(tokenizer.next());
            tokenizer.next()
        }
    }

    static match(tokenizer: Tokenizer) {
        return tokenizer.type('BLOCKS', section);
    }
}