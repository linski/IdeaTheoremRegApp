const DAYS = [...new Array(31)];
function BdaySelect({value, onSelectChange}) {
    return (
      <>
        <select className="bday-select" value={value} onChange={(e) => onSelectChange(e.target.value)}>
          <option className="bday-option-star" value="" disabled="disabled" selected="selected">Day *</option>
          { DAYS.map((each, index) => { const ind = index + 1; return <option key={ind} value={ind}>{ind}</option> }) }
        </select>
      </>
    );
}
export default BdaySelect;