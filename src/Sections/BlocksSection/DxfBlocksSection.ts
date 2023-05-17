import { DxfInterface, Dxfier } from 'Internals'
import { DxfObjectsSection, DxfTablesSection } from 'Sections'
import { DxfBlock } from './DxfBlock'
import { specialCharsRegex } from 'Internals/Utils'

export class DxfBlocksSection implements DxfInterface {
  readonly blocks: DxfBlock[] = []
  readonly modelSpace: DxfBlock
  readonly paperSpace: DxfBlock
  readonly tables: DxfTablesSection
  readonly objects: DxfObjectsSection

  private paperSpaceSeed = 0

  constructor(tables: DxfTablesSection, objects: DxfObjectsSection) {
    this.tables = tables
    this.objects = objects
    this.modelSpace = this.addBlock('*Model_Space', objects, false)
    this.paperSpace = this.addBlock('*Paper_Space', objects, false)
  }

  addBlock(
    name: string,
    objects: DxfObjectsSection,
    removeSpecialChars = true
  ): DxfBlock {
    if (removeSpecialChars) name = name.replace(specialCharsRegex, '')
    const blockRecord = this.tables.addBlockRecord(name)
    const block = new DxfBlock(name, objects)
    block.ownerObjectHandle = blockRecord.handle
    this.blocks.push(block)
    return block
  }

  addPaperSpace(): DxfBlock {
    const name = `*Paper_Space${this.paperSpaceSeed++}`
    return this.addBlock(name, this.objects, false)
  }

  dxfy(dx: Dxfier) {
    dx.start('BLOCKS')
    this.blocks.forEach(b => b.dxfy(dx))
    dx.end()
  }
}
