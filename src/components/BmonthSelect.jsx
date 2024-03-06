const MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ];
function BmonthSelect({value, onSelectChange}) {
    return (
        <>
          <select className="bday-select" value={value} onChange={(e) => onSelectChange(e.target.value)}>
            <option className="bday-option-star" value="" disabled="disabled" selected="selected">Month *</option>
            { MONTHS.map((each, index) => { const ind = index + 1; return <option key={ind} value={each}>{each}</option> }) }
          </select>
        </>
      );
}
export default BmonthSelect;