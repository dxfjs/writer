import { DxfBlock } from './DxfBlock'
import DxfInterface from 'Internals/Interfaces/DxfInterface'
import DxfObjectsSection from 'ObjectsSection/DxfObjectsSection'
import DxfTablesSection from 'TablesSection/DxfTablesSection'
import { Dxfier } from 'Internals/Dxfier'
import { specialCharsRegex } from 'Internals/Utils'

export class DxfBlocksSection implements DxfInterface {
  readonly blocks: DxfBlock[] = []
  readonly modelSpace: DxfBlock
  readonly paperSpace: DxfBlock
  readonly tables: DxfTablesSection

  constructor(tables: DxfTablesSection, objects: DxfObjectsSection) {
    this.tables = tables
    this.modelSpace = this.addBlock('*Model_Space', objects, false)
    this.paperSpace = this.addBlock('*Paper_Space', objects, false)
    this.modelSpace.stringifyEntities = false
  }

  addBlock(name: string, objects: DxfObjectsSection, removeSpecialChars = true): DxfBlock {
    if(removeSpecialChars)
      name = name.replace(specialCharsRegex, '')
    const blockRecord = this.tables.addBlockRecord(name)
    const block = new DxfBlock(name, objects)
    block.ownerObjectHandle = blockRecord.handle
    this.blocks.push(block)
    return block
  }

  dxfy(dx: Dxfier) {
    dx.start('BLOCKS')
    for (const b of this.blocks) b.dxfy(dx)
    dx.end()
  }
}
