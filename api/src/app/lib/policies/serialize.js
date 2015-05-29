import UserSerializer from '../../serializers/user';

let serialize = function(request, reply, next) {
  console.log(request.response.source.getModel().getTableName());
  request.response.source = new UserSerializer(request.response.source).serialize();
  next(null, true);
};

serialize.applyPoint = 'onPostHandler';

export default serialize;

