import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('images')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ default: new Date(), name: 'created_at' })
  createdAt!: Date

  @Column({ type: 'bytea' })
  buffer!: Buffer

  @Column({ name: 'base64_str' })
  base64Str!: string

  @Column({ name: 'file_type' })
  fileType!: string

  @Column({ name: 'file_name' })
  fileName!: string
}
