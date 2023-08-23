import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("tb_Merchants")
export class MerchantsSchema {
  
  @PrimaryColumn()
  merchantId: number

  @Column()
  merchantName: string

  @Column()
  state: boolean

  @Column()
  create_uid: number

  @Column({nullable: true})
  write_uid: number

  @Column()
  create_date: Date

  @Column({nullable: true})
  write_date: Date
}