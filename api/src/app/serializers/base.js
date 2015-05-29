import _ from 'lodash';

class BaseSerialzer {
  constructor(data = {}) {
    this.data       = data;
    this.isArray    = _.isArray(this.data);
    this.fields     = '*';

    // Don't auto run if in test mode
    let env = process.env.NODE_ENV;
  }

  serialize() {
    if (this.isArray) {
      return this._serializeArray();
    } else {
      return this._serializeObject();
    }
  }

  _serializeObject(item = null) {
    let workableData = (item) ? item : this.data;
    if (this.fields !== "*") {
      return this._serializeBySchema(workableData);
    } else {
      return workableData;
    }
  }

  _serializeArray() {
    var serializedData = [];
    _.each(this.data, (item) => {
      serializedData.push(this._serializeObject(item));
    });
    return serializedData;
  }

  _serializeBySchema(data) {
    let fields      = this.fields
    let dataObject  = _.pick(data, fields);

    let existingKeys = _.keys(data);
    let virtualKeys = _.difference(fields, existingKeys);

    if (virtualKeys.length) {
      virtualKeys.forEach((key) => {
        if (this[key] && typeof this[key] === 'function') {
          dataObject[key] = this[key].call(this);
        }
      });
    }

    return dataObject;

  }
}

export default BaseSerialzer;