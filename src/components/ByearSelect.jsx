const YEARS = [...new Array(90)];
function ByearSelect({value, onSelectChange}) {
    return (
      <>
        <select className="bday-select" value={value} onChange={(e) => onSelectChange(e.target.value)}>
        <option className="bday-option-star" value="" disabled="disabled" selected="selected">Year *</option>
          { YEARS.map((each, index) => { const ind = 2023 - index; return <option key={index+1} value={ind}>{ind}</option> }) }
        </select>
      </>
    );
}
export default ByearSelect;