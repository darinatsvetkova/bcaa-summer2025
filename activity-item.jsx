// src/activity/activity-item.jsx

function ActivityItem({ data }) {
    return (
      <div>
        <strong>{data.name}</strong> <br />
        {data.date} | {data.startTime} - {data.endTime} <br />
        {data.description && <em>{data.description}</em>}
        <hr />
      </div>
    );
  }
  
  export default ActivityItem;
  