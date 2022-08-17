import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { CollectionA, CollectionB } from '../payload-types';

export const addCreatedBy: BeforeChangeHook<CollectionA | CollectionB> = ({
  req,
  operation,
  data,
}) => {
  if (operation === 'create' && req.user) {
    data.createdBy = req.user.id;
  }
};
