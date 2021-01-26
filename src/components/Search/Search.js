import React, { useState } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../store/actions";
import { cutString } from "../../helpers/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

const statusOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Unset",
    value: "",
  },
];

const sortOption = [
  {
    label: "Unset",
    value: "",
  },
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation date oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation date newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion date oldest",
    value: "completion_date_oldest",
  },
  {
    label: "Completion date newest",
    value: "completion_date_newest",
  },
];

const dateOptions = [
  {
    label: "Create lte",
    value: "create_lte",
  },
  {
    label: "Create gte",
    value: "create_gte",
  },
  {
    label: "Complate lte",
    value: "complate_lte",
  },
  {
    label: "Complate gte",
    value: "complate_gte",
  },
];

function Search(props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({
    label: "",
    value: "",
  });
  const [sort, setSort] = useState({
    label: "",
    value: "",
  });

  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complate_lte: null,
    complate_gte: null,
  });

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = () => {
    const searchData = {
      search,
      status: status.value,
      sort: sort.value,
    };

    for (let key in dates) {
      let dateValue = dates[key];
      if (dateValue) {
        searchData[key] = dateValue.toLocaleDateString();
      }
    }

    props.getTasks(searchData);
  };

  return (
    <div className="w-100 , mt-2">
      <InputGroup className="mb-3">
        <FormControl
          value={search}
          placeholder="Search for add task"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
        />
        <DropdownButton
          as={InputGroup.Append}
          variant="outline-primary"
          title={status.value ? status.label : "Status"}
        >
          {statusOptions.map((option, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => setStatus(option)}
              active={status.value === option.value}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <DropdownButton
          as={InputGroup.Append}
          variant="outline-primary"
          title={sort.value ? cutString(sort.label, 5) : "Sort"}
        >
          {sortOption.map((option, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => setSort(option)}
              active={sort.value === option.value}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <InputGroup.Append>
          <Button variant="outline-primary" onClick={handleSubmit}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      {dateOptions.map((option) => (
        <div key={option.value}>
          <p>{option.label}</p>
          <DatePicker
            selected={dates[option.value]}
            onChange={(value) =>
              setDates({
                ...dates,
                [option.value]: value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
}

const mapDispatchToProps = {
  getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
