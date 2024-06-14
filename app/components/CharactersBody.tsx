"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Input,
  Textarea,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Character } from "@/types";

function CharactersBody({
  serverCharacters,
}: {
  serverCharacters: Character[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [characters, setCharacters] = useState(serverCharacters);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [charaImageUrl, setCharaImageUrl] = useState("");
  const [characterId, setCharacterId] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleOnClose = () => {
    setName("");
    setDetails("");
    setCharaImageUrl("");
    setCharacterId("");
  };

  const handleModalOpen = async (character: Character) => {
    setName(character.name);
    setDetails(character.details);
    setCharaImageUrl(character.image);
    setCharacterId(character.id);

    // Open the modal
    onOpen();
  };

  const handleGenerateCharacter = async () => {
    if (!name || !details) return;
    try {
      setLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/character/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            id: characterId || null,
            name,
            details,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCharaImageUrl(data.charaImageUrl);
        setCharacterId(data.characterId);

        // Refresh the character page
        const reFetchCharacters = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/character/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        const reFetchData = await reFetchCharacters.json();
        const characters = reFetchData.characters;

        // Update the character state
        setCharacters(characters);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleOnClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create your character
              </ModalHeader>
              <ModalBody>
                <Image
                  as={NextImage}
                  alt="Character image"
                  src={charaImageUrl || "/placeholder.png"}
                  width={1024}
                  height={1024}
                  className="w-full mb-4 overflow-hidden object-cover"
                />
                <Input
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter character name"
                  labelPlacement="outside"
                />
                <Textarea
                  type="text"
                  label="Details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  placeholder="i.e. Main personality, age, and physical traits..."
                  description="Dive deeper into your stories by adding intricate details to your characters, shaping your adventures uniquely and personally."
                  labelPlacement="outside"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={handleGenerateCharacter}
                >
                  {charaImageUrl ? "Recreate" : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="gap-4 flex flex-wrap">
        <div
          onClick={onOpen}
          className="h-60 w-56 rounded-3xl bg-default-100 ring-1 ring-default-200 flex justify-center items-center cursor-pointer shadow-xl shadow-background hover:shadow-none transition-shadow duration-300 ease-in-out"
        >
          <span className="text-lg font-bold select-none">+ Add</span>
        </div>
        {characters.map((character) => (
          <div
            onClick={() => handleModalOpen(character)}
            key={character.id}
            className="rounded-3xl bg-default-100 ring-1 ring-default-200 cursor-pointer shadow-xl shadow-background hover:shadow-none transition-shadow duration-300 ease-in-out"
          >
            <Image
              as={NextImage}
              alt={character.name}
              src={character.image}
              width={1024}
              height={1024}
              className="h-60 w-56 overflow-hidden object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharactersBody;
