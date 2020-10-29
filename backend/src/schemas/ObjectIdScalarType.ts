import { ASTNode, GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb';

const objectIdScalarType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'This is for MongoDB ObjectId',
  serialize(value: ObjectId) {
    return value.toHexString();
  },
  parseValue(value: string) {
    return new ObjectId(value);
  },
  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value);
    }
    return null;
  },
});

export default objectIdScalarType;
