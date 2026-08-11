//store-rating-platform/backend/src/services/owner.service.js

const ownerRepository =
  require("../repositories/owner.repository");


/**
 * =====================================================
 * GET OWNER DASHBOARD
 * =====================================================
 */
const getDashboard = async (
  ownerId,
  query
) => {

  const result =
    await ownerRepository.getDashboard(
      ownerId,
      query
    );


  return {

    totalStores:
      result.total,

    currentPage:
      result.currentPage,

    totalPages:
      result.totalPages,

    stores:
      result.stores.map(
        (store) => ({

          id: store.id,

          name: store.name,

          email: store.email,

          address: store.address,

          averageRating:
            Number(
              store.dataValues
                .averageRating || 0
            ).toFixed(1),

          totalRatings:
            Number(
              store.dataValues
                .totalRatings || 0
            ),

        })
      ),

  };
};


/**
 * =====================================================
 * GET OWNER RATINGS
 * =====================================================
 */
const getStoreRatings = async (
  ownerId,
  query
) => {

  const result =
    await ownerRepository.getStoreRatings(
      ownerId,
      query
    );


  return {

    total:
      result.total,

    currentPage:
      result.currentPage,

    totalPages:
      result.totalPages,

    ratings:
      result.ratings.map(
        (item) => ({

          id:
            item.id,

          rating:
            item.rating,

          createdAt:
            item.createdAt,

          storeId:
            item.storeId,

          // =================================================
          // STORE DETAILS
          // =================================================

          store: {

            id:
              item.store.id,

            name:
              item.store.name,

            email:
              item.store.email,

            address:
              item.store.address,

          },

          // =================================================
          // USER DETAILS
          // =================================================

          user: {

            id:
              item.user.id,

            name:
              item.user.name,

            email:
              item.user.email,

          },

        })
      ),

  };
};


module.exports = {
  getDashboard,
  getStoreRatings,
};