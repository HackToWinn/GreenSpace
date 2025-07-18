import e, { Request, Response } from "express";
import { storeImageToStorage } from "../utils/storeImageToStorage";
import { useBackend } from "../hooks/useActor";
import { imageBuffer } from "../utils/imageBuffer";
import { sanitize } from "../utils/sanitize";
import { internalError } from "../lib/internalError";
import { badRequest } from "../lib/badRequest";
import { Principal } from "@dfinity/principal";
import { Ed25519KeyIdentity } from "@dfinity/identity";


// Create user
export async function addUser(req: Request, res: Response) {

  const { username, email, delegation, identity } = req.body;
  let pictureUrl: string | null = null;

  if (!username || !email)
    return badRequest(res, "Missing required fields: username and email");
  if (!delegation || !identity)
    return badRequest(res, "Missing required fields: delegation and identity");


  try {
    if (req.file) {
      pictureUrl = await storeImageToStorage(req.file, req, res, 'users');
    }

    if (!pictureUrl) pictureUrl = "default.jpg";

    const Actor = await useBackend(identity, delegation);

    await Actor.addUser(email, username, pictureUrl);

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return internalError(res, "Failed to add user", error);
  }
}

// Update user
export async function updateUser(req: Request, res: Response) {
  const { username, email, delegation, identity } = req.body;
  if (!username || !email)
    return badRequest(res, "Missing required fields: username and email");
  if (!delegation)
    return badRequest(res, "Missing required field: delegation is required");

  let pictureUrl = "";
  try {
    if (req.file) {

      const uploadedUrl = await storeImageToStorage(req.file, req, res, 'users');
      if (!uploadedUrl) return internalError(res, "Failed to store picture to Azure Blob Storage");
      pictureUrl = uploadedUrl;
    }
    const Actor = await useBackend(identity, delegation);
    await Actor.updateUser(email, username, pictureUrl ? [pictureUrl] : []);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return internalError(res, "Failed to update user", error);
  }
}

// Get user
export async function getUser(req: Request, res: Response) {
  const { delegation, identity } = req.body;
  if (!delegation || !identity)
    return badRequest(res, "Missing required fields: delegation and identity");
  try {
    const Actor = await useBackend(identity, delegation);
    const user = await Actor.getMyProfile();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(sanitize(user));
  } catch (error) {
    return internalError(res, "Failed to fetch user", error);
  }
}

// Get all users
export async function getUsers(req: Request, res: Response) {
  try {
    const Actor = await useBackend();
    const users = await Actor.getUsers();
    if (!users || users.length === 0)
      return res.status(404).json({ error: "No users found" });
    res.status(200).json(users.map(sanitize));
  } catch (error) {
    return internalError(res, "Failed to fetch users", error);
  }
}



export async function getPrincipal(identity: Ed25519KeyIdentity, delegation: string): Promise<Principal> {
  const actor = await useBackend(identity, delegation);
  const principal = actor.whoami();
  return principal;
}