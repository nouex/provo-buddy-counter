const admin = require("firebase-admin");
const router = require('express').Router()
const countRef = admin.database().ref()

router.get("*", async (req, res) => { res.json(await get()) })
router.post("*", async (req, res) => {
  await add(~~req.query.add)
  res.json(null)
})

async function set(newCount) {
  await countRef.set(newCount)
}

async function get() {
  const countSnapshot = await countRef.once("value")
  if (!countSnapshot.exists()) {
    throw new Error("snapshot does not exists")
  } else {
    return +countSnapshot.val()
  }
}

async function add(n) {
  n = ~~n
  return set((await get()) + n)
}

module.exports = router
