import { ComboBox } from 'components/forms/Combobox'
import { Item } from 'react-stately'
import { RealmMap } from '@rbp/battle.net/dist/constants'
import Select from 'components/forms/Select'

export default function TestPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <ComboBox label="Realm">
          {Object.entries(RealmMap).map(([label, value]) => (
            <Item<string> key={value}>{label}</Item>
          ))}
        </ComboBox>

        <div className="my-10" />

        <Select label="Region">
          <Item key="us">US</Item>
          <Item key="eu">EU</Item>
        </Select>
      </div>
    </div>
  )
}
