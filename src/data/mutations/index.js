import * as User from './user';
import * as Order from './order';
import * as Product from './product';
import * as Category from './category';

export const MutationDefinition =`

    type Mutations {
        ${User.mutations}
        ${Order.mutations}
        ${Product.mutations}
        ${Category.mutations}
    }
`;

export default {
    User,
    Order,
    Product,
    Category,
};